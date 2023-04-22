/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as registry from './licenceRegistry.json';

/**
 * A data structure to hold information for a certain licence.
 */
export interface Licence {
    /** ID of the licence as it is known in the JSON registry */
    id: string;
    /** The display name of the licence */
    displayName: string;
    /** The licence body */
    body: string;
}

/**
 * Class to produce/retrive licences
 */
export class LicenceFactory {
    /**
     * Retrieve the desired licence (by `id`) from the `licenceRegistry.json` file.
     *
     * @param id Licence ID to locate
     * @returns Undefined if `id` could not be found
     */
    public static get(id: string): Licence | undefined {
        // get registry.<id> namespace member (json object)
        const registryLicenceObject = (<any>registry)[id];

        // if the member doesn't exist
        if (registryLicenceObject === undefined) {
            return undefined;
        }

        let licenceObject: Licence = {
            id: id,
            displayName: registryLicenceObject.displayName,
            body: registryLicenceObject.body.join("\n"),
        };

        return licenceObject;
    }

    /**
     * Retrieve array of all registered (supported) licences.
     */
    public static getAll(): Licence[] {
        let licenceArray: Licence[] = [];

        // iterate through licences by id
        Object.keys(registry).forEach((id) => {
            licenceArray.push(this.get(id)!);
        });

        return licenceArray;
    }

    /**
     * Return a licence object with custom specified display name and body text
     */
    public static custom(displayName: string, body: string): Licence {
        return {
            id: "custom",
            displayName: displayName,
            body: body
        };
    }
}
