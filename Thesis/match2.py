
import axelrod as axl
import csv
import json
import jsonpickle

# strats = [axl.Alternator(), axl.AntiTitForTat(), axl.Bully(), axl.Cooperator(),axl.Defector(), axl.SuspiciousTitForTat(), axl.TitForTat(), axl.Grudger(),axl.WinShiftLoseStay(), axl.WinStayLoseShift()]
# strats1 = [axl.Alternator(), axl.AntiTitForTat(), axl.Bully(), axl.Cooperator(),axl.Defector(), axl.SuspiciousTitForTat(), axl.TitForTat(), axl.Grudger(),axl.WinShiftLoseStay(), axl.WinStayLoseShift()]

strats1 = [axl.Cooperator(), axl.Defector(), axl.Grudger(), axl.TitForTat(), axl.WinStayLoseShift(), axl.StochasticCooperator(), axl.Bully(), axl.Grumpy(),axl.CollectiveStrategy(), axl.APavlov2011()]
strats2 = [axl.Cooperator(), axl.Defector(), axl.Grudger(), axl.TitForTat(), axl.WinStayLoseShift(), axl.StochasticCooperator(), axl.Bully(), axl.Grumpy(),axl.CollectiveStrategy(), axl.APavlov2011()]

pd = axl.game.Game(r=3, s=0, t=5, p=1)
stag = axl.game.Game(r=5, s=0, t=1, p=1)
chicken = axl.game.Game(r=4, s=3, t=5, p=0)

games = [pd, stag, chicken]

data = []

# for a,b in zip(strats, strats):

for a in strats1:
	for b in strats2:
	# b = axl.Alternator()
		players = (a,b)
		
		meta = {}
		meta["strat1"] = str(a)
		meta["strat2"] = str(b)
		meta["games"] = []

		for game in games:
			iter = {}
			
			match = axl.Match(players, game=game, turns=100)
			results = match.play()
			score = match.scores()

			l1 = [(tup[0]) for tup in score]
			l2 = [(tup[1]) for tup in score]


			def getSum(v):
			    total  = 0
			    sums   = []
			    
			    for i in v:
			      total = total + i
			      sums.append(total)
			    
			    return(sums)

			l3 = getSum(l1)
			l4 = getSum(l2)

			cscore = list(zip(l3,l4))

			jsonObj = []

			for i in range(len(results)):
			    step = (results[i]+score[i]+cscore[i])
			    Obj = list(step)
			    
			    p = {}
			    p["p1"] = str(Obj[0])
			    p["p2"] = str(Obj[1])
			    p["score1"]=Obj[2]
			    p["score2"]=Obj[3]
			    p["round"]=i
			    p["cscore1"]=Obj[4]
			    p["cscore2"]=Obj[5]
			    jsonObj.append(p)

			iter["game"] = str(game)
			iter["match"] = jsonObj
			iter["final_scores"] = match.final_score()
			iter["cooperations"] = match.cooperation()
			iter["cooperations_per_turn"]= match.normalised_cooperation() 
			iter["winner"] = str(match.winner())
			
			meta["games"].append(iter)

		data.append(meta)

print(data)

with open("./p5/empty-example/scores1.json", 'w') as f:
	f.write(json.dumps(data, sort_keys=True, indent=4, separators=(',', ': ')))



