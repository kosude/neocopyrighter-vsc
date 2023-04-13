/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import { CommentHeader, CopyrightNotice, LicenceFactory, getCommentStyleType } from '../_index';

/**
 * Service class for 'copyright-ing' documents.
 */
export class CopyrighterService {
    /**
     * Check the document in `editor` for whether or not a copyright notice has already been added.
     */
    public static checkCopyrightNotice(document: vscode.TextDocument): boolean {
        // if the document is empty
        if (document.lineCount <= 1) {
            return false;
        }

        // this is the same method as used in https://github.com/max-wilkinson/copyrighter...
        const copyrightLine = document.lineAt(1); // second line as the first has the comment head prefix
        if (copyrightLine.text.includes("Copyright")) {
            return true;
        }

        return false;
    }

    /**
     * Copyright the currently open text document if there is not already a copyright notice.
     * @param conf userConfig.ts namespace
     * @param editor text editor
     * @param licence optional licence ID
     */
    public static async insertCopyright(conf: any, editor: vscode.TextEditor, licence?: string) {
        if (this.checkCopyrightNotice(editor.document)) {
            return;
        }

        // construct copyright notice with user-set data
        const copyright = new CopyrightNotice({
            copyrightHolders: conf.getCopyrightHolders(),
            licence: LicenceFactory.get(licence ?? conf.getUserLicence().id)!,
            licenceFullForm: conf.getUserLicenceFullFormBoolean(),
            licenceFileName: await conf.getLicenceFileName()
        }, conf.getArrOnNewLine());

        // create comment header with appropriate style for the file type
        const comment = new CommentHeader(conf.getUserCommentStyle(getCommentStyleType(editor)), copyright.text);

        comment.pushToFile(editor).catch((e) => {
            vscode.window.showErrorMessage(`Attempted to add copyright notice - ${e}`);
        });
    }
}
