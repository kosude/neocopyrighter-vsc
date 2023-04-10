/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import * as lib from './lib/_index';

/**
 * Get user/workspace VS Code configuration
 */
function getConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration();
}

/**
 * Get the user-supplied list of copyright holders and (optionally) dates
 */
export function getCopyrightHolders(): lib.CopyrightHolder[] {
    const names: string[] | undefined = getConfiguration().get<string[]>("neocopyrighter.copyrightHolderNames");
    const dates: string[] | undefined = getConfiguration().get<string[]>("neocopyrighter.copyrightHolderDates");

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
