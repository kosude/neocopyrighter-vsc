/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import * as lib from './lib/_index';
import * as conf from './userConfig';

/**
 * Retrieves creation data for default copyright notices based on user preferences.
 */
export function copyrightNoticeData(): lib.CopyrightNoticeData {
    return {
        copyrightHolders: conf.getCopyrightHolders(),
        licence: conf.getUserLicence() ?? lib.LicenceFactory.empty()
    };
}
