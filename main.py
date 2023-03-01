from typing import Union
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

HTMLFILE = 'index.html'

@app.get("/", response_class=HTMLResponse)
async def read_items():
    with open(HTMLFILE) as fh:
        htmlPage = fh.read()
    return HTMLResponse(content=htmlPage, status_code=200)