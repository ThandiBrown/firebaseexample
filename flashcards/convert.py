import json
from flash_card_data import flashcard_data

		
def print_to_file(information = "This is information", filename = "title", extension = "txt", append = False):
	style = "a+" if append else "w"
	with open(filename + "." + extension, style, encoding='utf-8') as text_file:
		print(information, file=text_file)

	return 

def ensure_keys(dict_list):
	required_keys = ['title', 'hint', 'note', 'code', 'problem']
	
	for _, value in dict_list.items():
		# Ensure all required keys are present
		for key in required_keys:
			if key not in value or (key in value and value[key].strip() == ''):
				value[key] = None        
			elif key in value:
				value[key] = value[key].strip()

del flashcard_data['0']

ensure_keys(flashcard_data)


fc_file = """ 
function fc_data() {
	return """ + json.dumps(flashcard_data, indent=4, default=vars) + """
}

export {
	fc_data
}

"""
print_to_file(fc_file, 'flashCardData', 'js')
		