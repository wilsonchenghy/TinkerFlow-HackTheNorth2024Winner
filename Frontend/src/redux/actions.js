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