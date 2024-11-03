import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

class Mod implements IPostDBLoadMod
{
    private modConfig = require("../config/config.json");

    public postDBLoad(container: DependencyContainer): void
    {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);
        const categories = tables.templates.handbook.Categories;

        const subCategories = {};

        Object.assign(subCategories, { barter: categories.filter(x => x.ParentId == "5b47574386f77428ca22b33e")});
        Object.assign(subCategories, { gear : categories.filter(x => x.ParentId == "5b47574386f77428ca22b33f")});
        Object.assign(subCategories, { mods : categories.filter(x => x.ParentId == "5b5f71a686f77447ed5636ab")});
        Object.assign(subCategories, { weapon : categories.filter(x => x.ParentId == "5b5f78dc86f77409407a7f8e")});
        Object.assign(subCategories, { ammo : categories.filter(x => x.ParentId == "5b47574386f77428ca22b346")});
        Object.assign(subCategories, { provisions : categories.filter(x => x.ParentId == "5b47574386f77428ca22b340")});
        Object.assign(subCategories, { medication : categories.filter(x => x.ParentId == "5b47574386f77428ca22b344")});
        Object.assign(subCategories, { keys : categories.filter(x => x.ParentId == "5b47574386f77428ca22b342")});
        Object.assign(subCategories, { info : categories.filter(x => x.ParentId == "5b47574386f77428ca22b341")});
        Object.assign(subCategories, { special : categories.filter(x => x.ParentId == "5b47574386f77428ca22b345")});


        function blackListSubCat(subCatId) {
            const subCatItems = items.filter(x => x._parent == subCatId);
            for (const subCatItem of subCatItems) {
                subCatItem._props.CanSellOnRagfair = false;
            }
        }

        for (const [key, value] of Object.entries(this.modConfig)) {
            if (subCategories[key] && value) {
                console.log(`[FleaLimiter] Blacklisting ${key} from Flea Market.`);
                for (const subCat of subCategories[key]) {
                    blackListSubCat(subCat.Id);
                }
            }
        }
    }
}

export const mod = new Mod();
