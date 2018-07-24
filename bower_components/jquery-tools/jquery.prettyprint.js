;$.prettyPrint = function(obj,indent)
{
	var result = "";
	if (indent == null)
	{
		indent = "";
	}
	for (var property in obj)
	{
		var value = obj[property];
		if (typeof value == 'string')
		{
			value = "'" + value + "'";
		}
		else if (typeof value == 'object')
		{
			if (value instanceof Array)
			{
				value = "[ " + value + " ]";
			}
			else
			{
				var od = $.prettyPrint(value, indent + "    ");
				value = "{\n" + od + "\n" + indent + "}";
			}
		}
		result += indent + "'" + property + "' : " + value + ",\n";
	}
	return result.replace(/,\n$/, "");
};
