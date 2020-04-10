from aiohttp import web
import json

async def hello(request):
    return web.Response(text="Hello World")

async def getStations(request):
    with open("dispo-velov-station.json") as velovs:
        test = json.load(velovs)
        data = test["features"]

        fdata = [{
            "procedure": _["properties"]["procedure"],
            "name": _["properties"]["description"],
            "offering": _["properties"]["offering"],
            "url": _["properties"]["url_graph"],
            "geometry": _["geometry"]["coordinates"]
        } for _ in data]

        return web.json_response(fdata)

app = web.Application()
app.add_routes([
    web.get('/', hello),
    web.get("/stations", getStations)

])

web.run_app(app)