#!/bin/bash
for i in jquery*.js
do
	new=${i/jquery.mobile.datebox/}
	new="datebox-unbound${new/utf8./}"
	echo $new
	echo -e "/*\n * DateBox-Unbound : an Enhancment to JavaScript's Date() object\n * Copyright (c) JTSage\n * CC 3.0 Attribution.  May be relicensed without permission/notification.\n * https://github.com/jtsage/datebox-unbound\n */\n" > $new
	echo "jQuery.extend(Date.prototype.dbLang, {" >> $new
	sed -n -e 12p -e 19,22p -e 28,29p -e 33p -e 38p $i >> $new
	perl -i -npe 's/headerFormat/dateFormatLong/' $new
	perl -i -npe "s/timeFormat: 24/timeFormat: '%k:%M'/" $new
	perl -i -npe "s/timeFormat: 12/timeFormat: '%l:%M %p'/" $new
	perl -i -npe "s/\t}/\t\tmeridiemLetters: ['am', 'pm']\n\t}/" $new
	echo "});" >> $new
done
