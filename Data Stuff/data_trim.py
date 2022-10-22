df = pd.read_csv(".\AIS_2022_01_29.csv", encoding= 'unicode_escape')

#Then use iloc to select the column you want work on (in your case it seems 1st columns)

new_df = df[(df.iloc[:, 10]>=70) & (df.iloc[:, 10]<=79)]

print(new_df)

