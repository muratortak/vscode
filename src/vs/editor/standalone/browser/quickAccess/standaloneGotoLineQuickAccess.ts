/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AbstractGotoLineQuickAccessProvider } from 'vs/editor/contrib/quickAccess/gotoLineQuickAccess';
import { Registry } from 'vs/platform/registry/common/platform';
import { IQuickAccessRegistry, Extensions } from 'vs/platform/quickinput/common/quickAccess';
import { ICodeEditorService } from 'vs/editor/browser/services/codeEditorService';
import { withNullAsUndefined } from 'vs/base/common/types';
import { GoToLineNLS } from 'vs/editor/common/standaloneStrings';
import { Event } from 'vs/base/common/event';

export class StandaloneGotoLineQuickAccessProvider extends AbstractGotoLineQuickAccessProvider {

	protected readonly onDidActiveTextEditorControlChange = Event.None;

	constructor(@ICodeEditorService private readonly editorService: ICodeEditorService) {
		super();
	}

	protected get activeTextEditorControl() {
		return withNullAsUndefined(this.editorService.getFocusedCodeEditor());
	}
}

Registry.as<IQuickAccessRegistry>(Extensions.Quickaccess).registerQuickAccessProvider({
	ctor: StandaloneGotoLineQuickAccessProvider,
	prefix: AbstractGotoLineQuickAccessProvider.PREFIX,
	helpEntries: [{ description: GoToLineNLS.gotoLineActionLabel, needsEditor: true }]
});
