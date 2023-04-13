/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import { CommentStyle } from './commentStyle';

/**
 * A class to represent a comment header (i.e. a multi-line comment to be put at the top of a source file)
 */
export class CommentHeader {
    /** Comment header configuration */
    private _style?: CommentStyle;

    /** Overall comment string (including comment delimiters, e.g. forward slashes) */
    public get text() { return this._text; }
    private _text: string;

    /**
     * Dynamically generate a comment header based on parameters
     *
     * @param style Comment header configuration
     * @param innerText Text to show in the comment block
     */
    public constructor(style: CommentStyle | undefined, innerText: string) {
        this._style = style;
        this._text = this._generateCommentBlock(innerText);
    }

    /**
     * Asynchronously insert `commentHeader` to the top of the document in `editor`.
     *
     * @param editor VS Code API text editor class
     */
    public async pushToFile(editor: vscode.TextEditor) {
        await editor.edit(e => {
            e.insert(new vscode.Position(0, 0), this.text);
        });
    }

    /**
     * Asynchronously insert `commentHeader` to the top of the document in the currently open editor.
     *
     * @param commentHeader Comment header class
     */
    public async pushToCurrentFile() {
        if (vscode.window.activeTextEditor !== undefined) {
            // if there is an open text editor
            await this.pushToFile(vscode.window.activeTextEditor);
        } else {
            // if there is no open/active text editor
            throw new Error("No active text editor found!");
        }
    }

    /**
     * Given contents `innerText`, produce (and return) a multi-line comment block including them.
     *
     * @param innerText Comment header block contents
     * @returns String containing comment block
     */
    private _generateCommentBlock(innerText: string): string {
        // using regex allows us to easily handle CR, LF, and CRLF endings.
        const lines: string[] = innerText.split(/\r\n|\r|\n/);

        let commentBlock = "";

        // a comment style is required to build the header
        if (this._style !== undefined) {
            commentBlock += `${this._style!.headPrefix}\n`;

            lines.forEach(line => {
                commentBlock += `${this._style!.bodyPrefix} ${line}\n`;
            });

            commentBlock += `${this._style!.tailPrefix}\n\n`;
        }

        return commentBlock;
    }
}
