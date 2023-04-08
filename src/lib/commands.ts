/*
 *   Copyright (c) 2023 Jack Bennett
 *   All rights reserved.
 *
 *   Please see the LICENCE file for more information.
 */

import { pushToCurrentFile } from "./append";
import { generateCopyrightHeader } from "./formatter";

export function addCopyrightNotice(): void {
    pushToCurrentFile(generateCopyrightHeader());
}
