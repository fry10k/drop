'use strict'

const DefaultSettings = {
	"defaultPercent": null,
	"dropCooldown": 40,
    "afkMin": 1,
    "afkMax": 30
}
module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if(from_ver === undefined) {
		return Object.assign(Object.assign({}, DefaultSettings), settings);
	} else if(from_ver === null) {
			return DefaultSettings;
	} else {

        if (from_ver + 1 < to_ver) {

            settings = MigrateSettings(from_ver, from_ver + 1, settings);
            return MigrateSettings(from_ver + 1, to_ver, settings);
        }

        switch(to_ver)
        {
            case 2:
                settings.dropCooldown = 30;
                break;
            case 3:
                delete settings.firstUse;
                break;
            case 4:
                settings.afkMin = 1;
                settings.afkMax = 30;
                if(settings.dropCooldown < 40) {
                    settings.dropCooldown = 40;
                }
                break;
        }
        
        return settings;

	}
}