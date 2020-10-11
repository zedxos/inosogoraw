import sys

msg = sys.argv[1].split(",") 
regexGroups = sys.argv[2].split(",")  



print("I received these parameters: " + str(msg))  
print("These are the regex groups: " + str(regexGroups))
sys.stdout.flush()  # cleanup
