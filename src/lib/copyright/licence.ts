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
    public static get(id: string) : Licence | undefined {
        // get registry.<id> namespace member (json object)
        const read = (<any>registry)[id];

        // if the member doesn't exist
        if (read === undefined) {
            return undefined;
        }

        // in JSON, licence bodies are types as arrays of strings for readability as JSON does not ahve multiline strings
        // we must convert this to a single string
        let licenceObject: Licence = {
            displayName: read.displayName,
            body: read.body.join("\n") // joining strings to one text block here
        };

        return licenceObject;
    }

    /**
     * Get an empty licence object
     */
    public static empty() : Licence {
        return {
            displayName: "",
            body: ""
        };
    }
}
