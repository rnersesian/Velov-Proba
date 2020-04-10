from aiohttp import web
import json
from aiohttp import client
from datetime import date, timedelta
import time


async def getStations(request):
    """
        Get all stations informations + geoposition
    """
    with open("resources/dispo-velov-station.json") as velovs:
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


async def getStationHistory(request):
    """
        Get usage history of a specific station
    """
    velov = request.match_info.get("station_name")
    async with client.ClientSession() as session:
        async with session.get("https://download.data.grandlyon.com/sos/velov?service=SOS&request=GetObservation&version=1.0.0&procedure="
                +str(velov)
                +"&offering=reseau_velov&observedProperty=urn%3Aogc%3Adef%3Aparameter%3Ax-istsos%3A1.0%3Abikes%2Curn%3Aogc%3Adef%3Aparameter%3Ax-istsos%3A1.0%3Abike-stands&responseFormat=application%2Fjson&resultModel=om%3AObservation&eventTime=2020-04-02T10%3A40%3A00.000Z%2F2020-04-10T10%3A40%3A00.000Z") as res:
            raw_data = await res.text()
            data = json.loads(raw_data)["ObservationCollection"]["member"][0]["result"]["DataArray"]["values"]
            
            return web.json_response(data)


async def getLastUpdate(request):
    """
        Get last state of all stations
    """
    now = str(date.today())
    hour = str(time.strftime("%H"))
    minute = str(time.strftime("%M"))

    notNow = str(date.today() - timedelta(1))

    if (len(minute) == 1):
        minute = "0"+minute
    if (len(hour) == 1):
        hour = "0"+ hour

    velov = request.match_info.get("station_name")
    async with client.ClientSession() as session:
        async with session.get("https://download.data.grandlyon.com/sos/velov?service=SOS&request=GetObservation&version=1.0.0&procedure="
                +str(velov)
                +"&offering=reseau_velov&observedProperty=urn%3Aogc%3Adef%3Aparameter%3Ax-istsos%3A1.0%3Abikes%2Curn%3Aogc%3Adef%3Aparameter%3Ax-istsos%3A1.0%3Abike-stands&responseFormat=application%2Fjson&resultModel=om%3AObservation&eventTime="
                +notNow
                +"T"+ str(hour) +"%3A" + str(minute) + "%3A00.000Z%2F"
                +now
                +"T"+ str(hour) +"%3A"+ str(minute) +"%3A00.000Z") as res:

            
            raw_data = await res.text()
            data = json.loads(raw_data)["ObservationCollection"]["member"][0]["result"]["DataArray"]["values"]
            
            return web.json_response(data)

#https://download.data.grandlyon.com/ws/rdata/jcd_jcdecaux.jcdvelov/all.json
#last updates