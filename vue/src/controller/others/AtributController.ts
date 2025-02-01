import {
    collection,
    onSnapshot,
    getDocs,
    where,
    query,
} from "firebase/firestore";

import { initDB } from "@/config/apiConfig";
import { reactive } from "vue";
import { TimeController } from "@/controller/other/OtherController";

export class AtributController {
    private db = initDB.db;

    private _list = reactive({
        atribut: {
            load: false,
            run: false,
            data: [],
        },
        kelas: {
            load: false,
            run: false,
            data: [],
        },
    });

    private get time() {
        const timeC = new TimeController();
        timeC.realTime = false;
        return timeC;
    }

    get list() {
        return this._list;
    }
    get listData() {
        return {
            jk:this.jenis_kelamin,
            agama:this.agama,
            kelas:this.kelas,
        };
    }

    get jenis_kelamin(): any[] {
        const data = this._list.atribut.data.find((e) => e.secret_key == "jk");
        return data ? data.data : [];
    }
    get agama(): any[] {
        const data = this._list.atribut.data.find(
            (e) => e.secret_key == "agama"
        );
        return data ? data.data : [];
    }
    get kelas(): any[] {
        return this._list.kelas.data;
    }

    initAtribut() {
        if (this._list.atribut.run) return;
        this._list.atribut.run = true;
        this._list.atribut.load = true;
        let timOut = null;
        onSnapshot(collection(this.db, "atribut"), (snap) => {
            const data = snap.docs.map((doc) => {
                this._list.atribut.load = true;
                clearTimeout(timOut);
                timOut = setTimeout(() => {
                    this._list.atribut.load = false;
                }, 100);
                return doc.data();
            });

            this._list.atribut.data = data;
        });
    }

    async initKelas(): Promise<void> {
        this._list.kelas.load = true;
        const docs = await getDocs(collection(this.db, "kelas"));

        const data = [];
        docs.forEach((e) => {
            const eL = e.data();
            data.push(eL.label);
        });
        
        this._list.kelas.load = true;
        this._list.kelas.data = data.sort((a, b) =>   a.localeCompare(b) );
    }
}
