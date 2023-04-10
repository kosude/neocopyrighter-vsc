/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as vscode from 'vscode';

import * as lib from './lib/_index';
import * as defaults from './defaults';

/**
 * Binding for `neocopyrighter.add-copyright-notice`
 */
export function addCopyrightNotice() {
    const copyright = new lib.CopyrightNotice(defaults.copyrightNoticeData());

    const comment = new lib.CommentHeader({}, copyright.text);

    lib.insertCommentHeaderToCurrentFile(comment).catch((e) => {
        vscode.window.showErrorMessage(`Attempted to add copyright notice - ${e}`);
    });
}
