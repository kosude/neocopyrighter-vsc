/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import { CommentHeader } from './commentHeader';

/**
 * Asynchronously insert `commentHeader` to the top of the document in `editor`.
 *
 * @param editor VS Code API text editor class
 * @param commentHeader Comment header class
 */
export async function insertCommentHeader(editor: vscode.TextEditor, commentHeader: CommentHeader): Promise<void> {
    await editor.edit(e => {
        e.insert(new vscode.Position(0, 0), `${commentHeader.text}\n\n`);
    });
}

/**
 * Asynchronously insert `commentHeader` to the top of the document in the currently open editor.
 *
 * @param commentHeader Comment header class
 */
export async function insertCommentHeaderToCurrentFile(commentHeader: CommentHeader): Promise<void> {
    if (vscode.window.activeTextEditor !== undefined) {
        // if there is an open text editor
        await insertCommentHeader(vscode.window.activeTextEditor, commentHeader);
    } else {
        // if there is no open/active text editor
        return Promise.reject("No active editor found");
    }
}
