from pydantic import (
    Field,
)
from fastapi.middleware.cors import (
    CORSMiddleware,
)
from fastapi import (
    FastAPI,
    HTTPException,
    status,
    Query,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


import run


@app.get(
    "/",
)
def read_root():
    return "Welcome!"


@app.get("/job")
async def job(
    task_name: str = Query(
        ...,
        title="Task Name",
        description="Task name to run",
    ),
    cid: str = Query(
        ...,
        title="CID",
        description="CID of the task",
    ),
):
    task_type = task_name.upper()
    if task_type not in [str(x.value) for x in run.TaskType]:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Task type {task_type} not supported",
        )

    response = run.run_lilypad(cid)
    if response["status"] == "failed":
        return HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=response["response"],
        )

    return run.handle_output(task_type, response)
