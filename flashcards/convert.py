import json
from flash_card_data import flashcard_data

		
def print_to_file(information = "This is information", filename = "title", extension = "txt", append = False):
	style = "a+" if append else "w"
	with open(filename + "." + extension, style, encoding='utf-8') as text_file:
		print(information, file=text_file)

	return 

def ensure_keys(dict_list):
	required_keys = ['title', 'hint', 'note', 'code', 'problem']
	del dict_list['0']
	for _, value in dict_list.items():
		# Ensure all required keys are present
		for key in required_keys:
			if key not in value or (key in value and value[key].strip() == ''):
				value[key] = None        
			elif key in value:
				value[key] = value[key].strip()

def assign_to_js_file(flashcard_data):
	fc_file = """ 
	function fc_data() {
		return """ + json.dumps(flashcard_data, indent=4, default=vars) + """
	}

	export {
		fc_data
	}

	"""
	print_to_file(fc_file, 'flashCardData', 'js')
	return 

def print_all_titles(flashcard_data):
	for data in flashcard_data.values():
		print(data['title'].strip())
	return 






if __name__ == '__main__':

	ensure_keys(flashcard_data)
	assign_to_js_file(flashcard_data)
	# print_all_titles(flashcard_data)
	pass