export const SuccessMessage = {
    after_render: () => {},
    render: (param) => {
        return `
                <div class="alert alert-success" role="alert">
                    ${param} <span id="toHome"> Finish </span>
                </div>
            `
    },
    render1: (param) => {
        return `
                <div class="alert alert-success" role="alert">
                    ${param} <span id="toSign"> Finish </span>
                </div>
            `
    }
}