import { defineStore } from "pinia";
import { LandingPageController } from "@/controller/users/LandingPageController";

export const crudStore = defineStore(`landingPageStore`, () => {
    const controller = new LandingPageController();
    return { controller };
});
