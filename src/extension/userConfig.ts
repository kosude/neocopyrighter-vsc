/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import * as lib from '../lib/_index';

/**
 * Get user/workspace VS Code configuration
 */
function getConfiguration() { return vscode.workspace.getConfiguration(); }

/**
 * Get the user-supplied list of copyright holders and (optionally) dates
 */
export function getCopyrightHolders(): lib.CopyrightHolder[] {
    const names: string[] | undefined = getConfiguration().get<string[]>("neocopyrighter.author.copyrightHolderNames");
    const dates: string[] | undefined = getConfiguration().get<string[]>("neocopyrighter.author.copyrightHolderYears");

    if (names === undefined) {
        return [];
    }

    // map the separate string arrays into a single holders array
    let holderObjects: lib.CopyrightHolder[] = [];
    for (let i = 0; i < names.length; i++) {
        holderObjects.push({
            name: names[i],
            date: (dates !== undefined) ? ((dates[i] !== "") ? dates[i] : undefined) : undefined
        });
    }

    return holderObjects;
}

/**
 * Get user-specified licence type
 *
 * @returns Undefined if the user-specified licence id was invalid
 */
export function getUserLicence(): lib.Licence {
    // drop-down list should never be undefined in practice, and will only contain valid ids!
    const licenceStr: string = getConfiguration().get<string>("neocopyrighter.licence.identifier")!;

    return lib.LicenceFactory.get(licenceStr)!;
}

/**
 * Get boolean considering whether or not the user has specified the full form of the licence to be included in copyright notices.
 */
export function getUserLicenceFullFormBoolean(): boolean {
    // it should be impossible for a VS Code boolean value to be undefined, so we rely on it being set (!)
    const isFullForm: boolean = getConfiguration().get<boolean>("neocopyrighter.licence.includeFullForm")!;

    return isFullForm;
}
