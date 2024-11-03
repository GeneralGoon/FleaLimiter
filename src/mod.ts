import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BaseClasses } from "@spt/models/enums/BaseClasses";

class Mod implements IPostDBLoadMod
{
    //private modConfig = require("../config/config.json");

    public postDBLoad(container: DependencyContainer): void
    {
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        const tables: IDatabaseTables = databaseServer.getTables();

        const items = Object.values(tables.templates.items);
        const itemHelper: ItemHelper = container.resolve<ItemHelper>("ItemHelper");

        const notbarterItems = items.filter(x => !itemHelper.isOfBaseclass(x._id, BaseClasses.BARTER_ITEM));
        for (const otherItem of notbarterItems) {
            otherItem._props.CanSellOnRagfair = false;
        }
    }
}

export const mod = new Mod();
