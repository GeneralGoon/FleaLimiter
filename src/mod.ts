import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BaseClasses } from "@spt/models/enums/BaseClasses";

class Mod implements IPostDBLoadMod
{
    private modConfig = require("../config/config.json");

    public postDBLoad(container: DependencyContainer): void
    {
        const itemHelper: ItemHelper = container.resolve<ItemHelper>("ItemHelper");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();
        const items = Object.values(tables.templates.items);
        
        const config = {
            barter: {
                enabled: this.modConfig.barter,
                baseClass: BaseClasses.BARTER_ITEM
            },
            gear: {
                enabled: this.modConfig.gear,
                baseClass: BaseClasses.EQUIPMENT
            },
            container: {
                enabled: this.modConfig.container,
                baseClass: BaseClasses.LOCKABLE_CONTAINER
            },
            container2: {
                enabled: this.modConfig.container,
                baseClass: BaseClasses.SIMPLE_CONTAINER
            },
            vest: {
                enabled: this.modConfig.gear,
                baseClass: BaseClasses.VEST
            },
            backpack: {
                enabled: this.modConfig.gear,
                baseClass: BaseClasses.BACKPACK
            },
            mods: {
                enabled: this.modConfig.mods,
                baseClass: BaseClasses.MOD
            },
            weapon: {
                enabled: this.modConfig.weapon,
                baseClass: BaseClasses.WEAPON
            },
            melee: {
                enabled: this.modConfig.weapon,
                baseClass: BaseClasses.KNIFE
            },
            throwables: {
                enabled: this.modConfig.weapon,
                baseClass: BaseClasses.THROW_WEAPON
            },
            ammo: {
                enabled: this.modConfig.ammo,
                baseClass: BaseClasses.AMMO
            },
            ammopacks: {
                enabled: this.modConfig.ammo,
                baseClass: BaseClasses.AMMO_BOX
            },
            provisions: {
                enabled: this.modConfig.provisions,
                baseClass: BaseClasses.FOOD_DRINK
            },
            medication: {
                enabled: this.modConfig.medication,
                baseClass: BaseClasses.MEDS
            },
            keys: {
                enabled: this.modConfig.keys,
                baseClass: BaseClasses.KEY
            },
            info: {
                enabled: this.modConfig.info,
                baseClass: BaseClasses.INFO
            },
            map: {
                enabled: this.modConfig.info,
                baseClass: BaseClasses.MAP
            },
            special: {
                enabled: this.modConfig.special,
                baseClass: BaseClasses.SPEC_ITEM
            },
        };

        const blacklistedClasses = Object.values(config)
            .filter(x => x.enabled === true)
            .map(x => x.baseClass);

        for (const item of items) {
            if (itemHelper.isOfBaseclasses(item._id, blacklistedClasses)) {
                item._props.CanSellOnRagfair = false;
            }
        }
    }
}

export const mod = new Mod();
