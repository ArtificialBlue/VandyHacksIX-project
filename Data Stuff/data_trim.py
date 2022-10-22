import pandas as pd

df = pd.read_csv('AIS_2022_01_29.csv')
#70-79
cargoVesselType = df[(df['VesselType'].between(70, 79, inclusive=True))].drop(columns=['MMSI',"SOG","COG","IMO","Status","Draft","Cargo","TransceiverClass"])
print(cargoVesselType)

cargoVesselType.to_csv('cargoVesselType.csv', index=False)