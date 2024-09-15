import { atom, useAtom } from "jotai";

const settings = ["personalinfo", "aboutme", "ikigai", "biography"];

type Config = {
  selected: string | null;
};

const configAtom = atom<Config>({
  selected: "",
});

export function useSetting() {
  return useAtom(configAtom);
}
