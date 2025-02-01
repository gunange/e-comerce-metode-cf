import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
import { color } from "./color";

const colorScheme = {
   light: {
      primary: {
         color: "{zinc.950}",
         inverseColor: "#ffffff",
         hoverColor: "{zinc.900}",
         activeColor: "{zinc.800}",
      },
      highlight: {
         background: "{zinc.950}",
         focusBackground: "{zinc.700}",
         color: "#ffffff",
         focusColor: "#ffffff",
      },
   },
   dark: {
      primary: {
         color: "{zinc.50}",
         inverseColor: "{zinc.950}",
         hoverColor: "{zinc.100}",
         activeColor: "{zinc.200}",
      },
      highlight: {
         background: "rgba(250, 250, 250, .16)",
         focusBackground: "rgba(250, 250, 250, .24)",
         color: "rgba(255,255,255,.87)",
         focusColor: "rgba(255,255,255,.87)",
      },
   },
};

export const gunangePreset = definePreset(Aura, {
   semantic: {
      primary: color.blue,
      iconSize: "1rem",
      // colorScheme :colorScheme
   },
   components: {
      menu: {
         border: {
            radius: "10px",
            color: "none",
         },
         item: {
            focus: {
               background: "transparent",
            },
         },
      },
      breadcrumb: {
         background: "transparent",
         padding: "0",
         item: {
            icon: {
               color: "rgb(var(--primary))",
            },
            hover: {
               color: "rgb(var(--primary-700))",
            },
         },
         separator: {
            color: color.indigo[300],
         },
      },
      button: {
         icon: {
            only: {
               width: "1rem",
            },
         },
         lg: {
            padding: {
               x: "1rem",
               y: ".65rem",
            },
            font: {
               size: "1.25rem",
            },
         },
         sm: {
            padding: {
               x: ".6rem",
               y: ".4rem",
            },
            font: {
               size: ".7rem",
            },
         },
      },
   },
});
