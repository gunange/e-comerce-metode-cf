import { MenuItem } from "primevue/menuitem";
import { ref, reactive } from "vue";

const items = reactive([
   [
      {
         label: "Untuk Staff & Dosen",
         class: "sub-label",
         items: [
            {
               label: "User Dashboard",
               icon: "pi pi-list",
               class: "sub-menu",
            },
            {
               label: "Sister",
               icon: "pi pi-users",
               class: "sub-menu",
            },
            {
               label: "Jurnal",
               icon: "pi pi-file",
               class: "sub-menu",
            },
            {
               label: "Simlimtabmas",
               icon: "pi pi-file",
               class: "sub-menu",
            },
            {
               label: "Jafa",
               icon: "pi pi-file",
               class: "sub-menu",
            },
            {
               label: "lldikti XII",
               icon: "pi pi-file",
               class: "sub-menu",
            },
         ],
      },
   ],
   [
      {
         label: "Untuk Mahasiswa",
         class: "sub-label",
         items: [
            {
               label: "Siakad",
               icon: "pi pi-shield",
               class: "sub-menu",
            },
            {
               label: "Teams",
               icon: "pi pi-question",
               class: "sub-menu",
            },
            {
               label: "Jurnal",
               icon: "pi pi-search",
               class: "sub-menu",
            },
            {
               label: "Peneriamaan",
               icon: "pi pi-search",
               class: "sub-menu",
            },
            {
               label: "Job Fair",
               icon: "pi pi-search",
               class: "sub-menu",
            },
            {
               label: "Event",
               icon: "pi pi-search",
               class: "sub-menu",
            },
         ],
      },
   ],
]);

export const menu: MenuItem[] = reactive(
   [
      {
         label: "Tentang",
         icon: "pi pi-box",
         root: true,
         class: "head-menu",
         items: items,
      },
      {
         label: "Pendidikan",
         icon: "pi pi-box",
         root: true,
         class: "head-menu",
         items: items,
      },
      {
         label: "Penelitian",
         icon: "pi pi-box",
         root: true,
         class: "head-menu",
         items: items,
      },
      {
         label: "Pengabdian",
         root: true,
         class: "head-menu",
         icon: "pi pi-box",
         items: items,
      },
      {
         label: "Layanan",
         // root: true,
         icon: "pi pi-box",
         class: "head-menu",
         items: items,
      },
      {
         label: "Berita",
         root: true,
         icon: "pi pi-box",
         class: "head-menu",
         items: [
            [
               {
                  label: "Untuk Staff & Dosen",
                  class: "sub-label",
                  items: [
                     {
                        label: "User Dashboard",
                        icon: "pi pi-list",
                        class: "sub-menu",
                     },
                     {
                        label: "Sister",
                        icon: "pi pi-users",
                        class: "sub-menu",
                     },
                     {
                        label: "Jurnal",
                        icon: "pi pi-file",

                        class: "sub-menu",
                     },
                     {
                        label: "Simlimtabmas",
                        icon: "pi pi-file",
                        class: "sub-menu",
                     },
                     {
                        label: "Jafa",
                        icon: "pi pi-file",
                        class: "sub-menu",
                     },
                     {
                        label: "lldikti XII",
                        icon: "pi pi-file",
                        class: "sub-menu",
                     },
                  ],
               },
            ],
         ],
      },
   
]);
