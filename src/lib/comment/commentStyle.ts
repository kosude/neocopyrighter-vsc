/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import * as bindings from './commentStyleBindings.json';

/**
 * Interface containing comment style information
 */
export interface CommentStyle {
    /** Comment prefix on the first line of the header (e.g. '/*') */
    headPrefix: string;
    /** Comment prefix on middle lines of the header (e.g. ' *') */
    bodyPrefix: string;
    /** Comment prefix on the last line of the header, e.g. */
    tailPrefix: string;
}

/**
 * Get the appropriate comment style for the given language by id
 *
 * @param langId VS Code language id
 *
 * @returns undefined if no comment style is bound to `langId`
 */
export function getCommentStyleTypeForLang(langId: string): string | undefined {
    // iterate through comment style definitions
    let styleDefs = Object.entries(bindings);

    for (let i = 0; i < styleDefs.length; i++) {
        if (styleDefs[i][1].languages.find((e) => e === langId)) {
            return styleDefs[i][0];
        }
    }

    console.warn(`Language id "${langId}" does not have a bound comment style type. Submit an issue or pr to the GH repo to have it added!`);

    return undefined;
}

/**
 * Get the appropriate comment style for the current document's language
 */
export function getCommentStyleTypeForCurrentDocument(): string | undefined {
    const openEditor = vscode.window.activeTextEditor;
    if (openEditor === undefined) {
        return undefined;
    }

    return getCommentStyleTypeForLang(openEditor.document.languageId);
}
