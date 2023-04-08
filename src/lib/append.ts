/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import { Position, TextEditor, window } from "vscode";

/**
 * Inserts the given text (`str`) into the file in `editor`.
 *
 * @param editor The text editor containing the document to push to.
 * @param str The string to insert.
 */
export async function pushToFile(editor: TextEditor, str: string): Promise<void> {
    await editor.edit(e => {
        e.insert(new Position(0, 0), str);
    }).then();
}

/**
 * Inserts the given text (`str`) into the currently open text editor's document.
 *
 * @param str The string to insert
 */
export async function pushToCurrentFile(str: string): Promise<void> {
    if (window.activeTextEditor !== undefined) {
        await pushToFile(window.activeTextEditor, str);
    }
}
