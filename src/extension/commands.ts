/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import * as lib from '../lib/_index';
import * as conf from './userConfig';

/**
 * Binding for `neocopyrighter.add-copyright-notice-<licence id>`
 * This function adds a copyright notice for a specific licence regardless of user or workspace settings.
 */
export async function addCopyrightNoticeWithLicence(id: string) {
    const copyright = new lib.CopyrightNotice({
        copyrightHolders: conf.getCopyrightHolders(),
        licence: lib.LicenceFactory.get(id)!,
        licenceFullForm: conf.getUserLicenceFullFormBoolean(),
        licenceFileName: await conf.getLicenceFileName()
    });

    const comment = new lib.CommentHeader({}, copyright.text);

    lib.insertCommentHeaderToCurrentFile(comment).catch((e) => {
        vscode.window.showErrorMessage(`Attempted to add copyright notice - ${e}`);
    });
}

/**
 * Binding for `neocopyrighter.add-copyright-notice`
 */
export async function addCopyrightNotice() {
    await addCopyrightNoticeWithLicence(conf.getUserLicence().id);
}
