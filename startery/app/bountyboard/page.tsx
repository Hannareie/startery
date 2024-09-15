"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/nav";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
    <>
      <MainNav />

      <div className="flex overflow-y-scroll p-4">
        {/* Filters - 1/4 width */}
        <div className="w-1/4 p-4 bg-white">
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
          </div>
        </div>

        {/* Tasks - 3/4 width */}
        <div className="w-3/4 p-4 flex flex-col h-full justify-end">
          <div className="m-2 flex gap-4">
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
          <div className="m-2 mb-4">
            <div className="text-2xl font-semibold">Active</div>
            <div className="pt-1">Showing {filteredTasks.length} tasks</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ml-2 mr-2">
            {currentTasks.map((task) => (
              <Dialog key={task.id}>
                <DialogTrigger asChild>
                  <Card className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="flex-grow">
                      <p className="text-xl pb-4 pt-4">{task.task_name}</p>
                      <p>Posted by: {task.client_name}</p>
                      <div className="pb-2 pt-2 mt-auto">
                        {task.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="border"
                            className="mr-1 mb-1"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p>Due Date: {task.due_date}</p>
                      <p className="mt-2">Description: {task.description}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[850px]">
                  <div className="m-6 ml-8 mr-8 grid gap-2">
                    <div>
                      <p className="text-2xl">{task.task_name}</p>
                      <p className="text-gray-500 pt-4">
                        Posted by: {task.client_name}
                      </p>
                      <p className="text-gray-500">Due Date: {task.due_date}</p>
                    </div>
                    <div className="flex flex-row gap-4 pt-2 pb-2">
                      <Button variant="next" className="w-32 h-9">
                        Apply Now
                      </Button>
                      <Button variant="back" className="w-32 h-9">
                        Bookmark
                      </Button>
                    </div>
                    <div>
                      <p className="font-semibold pb-2">Overview</p>
                      <p>{task.description}</p>
                      <p className="font-semibold pt-2">Responsibilities</p>
                      <ul className="list-disc pl-4 pt-2">
                        {task.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                      <p className="font-semibold pt-2">Skills</p>
                      <ul className="list-disc pl-4 pt-2">
                        {task.skills.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-4 flex h-full justify-center">
            {Array.from(
              { length: Math.ceil(filteredTasks.length / tasksPerPage) },
              (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  variant={currentPage === i + 1 ? "back" : "next"}
                  className="mx-1"
                >
                  {i + 1}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
