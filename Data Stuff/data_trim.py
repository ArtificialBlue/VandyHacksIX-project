import pandas as pd

df = pd.read_csv('AIS_2022_01_29.csv')
#70-79
cargoVesselType = df(df['VesselType'] >= 70 and df['VesselType'] <= 79).any(axis=1)
print(cargoVesselType.head())