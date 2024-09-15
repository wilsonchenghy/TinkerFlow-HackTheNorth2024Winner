export const changeInstructionContentAction = (instructionContent) => ({
    type: 'CHANGE_INSTRUCTION_CONTENT',
    payload: instructionContent,
});

export const changeInstructionTitleAction = (instructionTitle) => ({
    type: 'CHANGE_INSTRUCTION_TITLE',
    payload: instructionTitle,
});

export const changeSchemeticAction = (schemetic) => ({
    type: 'CHANGE_SCHEMETIC',
    payload: schemetic,
});

export const changeComponentNamesAction = (componentNames) => ({
    type: 'CHANGE_COMPONENT_NAMES',
    payload: componentNames,
});

export const changeIsLoadingAction = (isLoading) => ({
    type: 'CHANGE_IS_LOADING',
    payload: isLoading,
});