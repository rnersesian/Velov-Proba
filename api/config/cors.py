import asyncio
import aiohttp_cors
from aiohttp import web


def setup_cors(app):
    "Declare CORS rights"

    cors = aiohttp_cors.setup(app, defaults={
        "http://localhost:3000": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            max_age=3600,
            expose_headers="*",
            allow_headers="*",
        )}
    )

    for route in app.router.routes():
        cors.add(route)