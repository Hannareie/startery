"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { MainNav } from "@/components/nav";
import { Separator } from "@/components/ui/separator";

interface Task {
  id: number;
  task_name: string;
  client_name: string;
  project_type: string;
  skills: string[];
  project_duration: string;
  due_date: string;
  category: string;
  description: string;
}

export default function Bountyboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProjectType, setSelectedProjectType] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>();
  const [sortOption, setSortOption] = useState<string>("most-urgent");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    fetch("/tasks.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          throw new Error("Fetched data is not in the expected format");
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const categories = Array.from(new Set(tasks.map((task) => task.category)));
  const projectTypes = Array.from(
    new Set(tasks.map((task) => task.project_type))
  );
  const projectSkills = Array.from(
    new Set(tasks.flatMap((task) => task.skills))
  );

  const filteredTasks = tasks.filter(
    (task) =>
      task.task_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(task.category)) &&
      (selectedProjectType.length === 0 ||
        selectedProjectType.includes(task.project_type)) &&
      (selectedSkills.length === 0 ||
        task.skills.some((skill) => selectedSkills.includes(skill))) &&
      (!selectedDueDate || new Date(task.due_date) <= selectedDueDate)
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOption) {
      case "most-urgent":
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      case "alphabetical":
        return a.task_name.localeCompare(b.task_name);
      case "category":
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <MainNav />

      <div className="flex h-screen m-4">
        {/* Filters - 1/4 width */}
        <div className="w-1/4 p-4 bg-white shadow-md">
          <div className="text-4xl pb-6">Bountyboard</div>
          <div className="space-y-4 border-2 rounded-xl p-6 pb-8">
            <div className="flex">
              <div className="text-xl">Filters</div>
              <Button
                className="ml-auto h-8"
                variant="outline"
                onClick={() => {
                  setSearchTerm(""); // Reset search term
                  setSelectedCategories([]); // Reset selected categories
                  setSelectedProjectType([]); // Reset project type
                  setSelectedDueDate(undefined); // Reset due date
                }}
              >
                Clear all
              </Button>
            </div>

            <div>
              <Label>Project Type</Label>
              <div className="mt-2">
                <>
                  {projectTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedProjectType.includes(type)}
                        onCheckedChange={(checked) => {
                          setSelectedProjectType((prev) =>
                            checked
                              ? [...prev, type]
                              : prev.filter((c) => c !== type)
                          );
                        }}
                      />
                      <label htmlFor={type}>{type}</label>
                    </div>
                  ))}
                </>
              </div>
            </div>
            <Separator />
            <div>
              <Label>Skills</Label>
              <div className="mt-2">
                {projectSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={(checked) => {
                        setSelectedSkills((prev) =>
                          checked
                            ? [...prev, skill]
                            : prev.filter((c) => c !== skill)
                        );
                      }}
                    />
                    <label htmlFor={skill}>{skill}</label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <Label>Categories</Label>
              <div className="mt-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories((prev) =>
                          checked
                            ? [...prev, category]
                            : prev.filter((c) => c !== category)
                        );
                      }}
                    />
                    <label htmlFor={category}>{category}</label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <Label>Due Date (Before)</Label>
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDueDate ? (
                        format(selectedDueDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDueDate}
                      onSelect={setSelectedDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks - 3/4 width */}
        <div className="w-3/4 p-4">
          <div className="m-4 flex gap-4">
            <div className="w-3/4">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                className="mt-2"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-1/4">
              <Label>Sort By</Label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-urgent">Most Urgent</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="m-4">
            <div className="text-2xl font-semibold">Active</div>
            <div className="pt-1">Showing {filteredTasks.length} tasks</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 m-4">
            {currentTasks.map((task) => (
              <Card key={task.id} className="flex flex-col">
                <CardContent className="flex-grow">
                  <p className="text-xl pb-2 pt-4">{task.task_name}</p>
                  <p>Posted by: {task.client_name}</p>
                  <div className="pb-2 pt-2 mt-auto">
                    {task.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="default"
                        className="mr-1 mb-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p>Due Date: {task.due_date}</p>
                  <p className="mt-2">Description: {task.description}</p>
                  {/**<p>Project Type: {task.project_type}</p>
                  <p>Skills: {task.skills.join(", ")}</p>
                  <p>Duration: {task.project_duration}</p>
                  <p>Due Date: {task.due_date}</p>
                  <p>Category: {task.category}</p>*/}
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from(
              { length: Math.ceil(filteredTasks.length / tasksPerPage) },
              (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className="mx-1"
                >
                  {i + 1}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
