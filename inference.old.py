import os
import json
import logging
input_dir = '/input'
output_dir = '/output'

TEST = "THIS IS TEST"

print('THIS IS ALSO A TEST!!!')
# write to /outputs/response.txt

with open(os.path.join(output_dir, 'response.txt'), 'w') as f:
    f.write(TEST)


print("ENOUGH!")

logging.info("ALSO TEST!")


with open(os.path.join('/outputs/', 'response.txt'), 'w') as f:
    f.write(TEST)


with open(os.path.join('./', 'a.txt'), 'w') as f:
    f.write(TEST)

# print all kwargs

print("ARGS: ", os.environ['ARGS'])
print("KWARGS: ", os.environ['KWARGS'])
