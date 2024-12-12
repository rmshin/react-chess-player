from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel

app = FastAPI()
host = "localhost"
port = 8000

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GameFenState(BaseModel):
    fen: str

@app.post("/save-state")
def save_state(state: GameFenState):
    print(state)
    return {"fen": state.fen}


if __name__ == "__main__":
    uvicorn.run(app, host=host, port=port)
