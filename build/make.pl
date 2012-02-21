#!/usr/bin/perl -w

$javapath = `which java`;
chomp $javapath;
$version = '';

$slugtext = "/*\n * DateBox-Unbound : an Enhancment to JavaScript's Date() object\n * Copyright (c) JTSage\n * CC 3.0 Attribution.  May be relicensed without permission/notification.\n * https://github.com/jtsage/jquery-mobile-datebox\n */\n";

if ( $javapath eq '' ) {
	die "Java not found, can not continue\n";
}

if ( $ARGV[0] ) {
	
	if ( $ARGV[0] eq 'min' ) {
		print "Making just main script... \n";
		make_master();
	}
	elsif ( $ARGV[0] eq 'all' ) {
		if ( defined($ARGV[1]) ) {
			$version = "-".$ARGV[1];
		}
		print "Making all usual variants... ($version)\n";
		
		make_master();
		print "BUILD FINISHED.\n";
	}
	else {
		show_usage();
	}
	
} else {
	show_usage();
}

sub show_usage {
	print "\nDateBox Build Script\n";
	print "--------------------\n";
	print "Targets: (./make.pl <target>)\n";
	print " all   :-: Build all scripts\n";
	print " usage :-: Show this information\n";
	print " min   :-: Only minimize main script\n\n";
}

sub make_master {
	print "Build :-: Combinded Script... ";
	if ( $version ne '' ) {
		system("cp", "../js/datebox-unbound.js", "datebox-unbound".$version.".js");
	}
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./datebox-unbound".$version.".min.js", "../js/datebox-unbound.js");
	print "DONE.\n";
	do_slug("./datebox-unbound".$version.".min.js");
	print "DONE.\n";
}

sub do_slug {
	local @ARGV = ($_[0]);
	local $^I = '.bac';
	while(<>){
		if ($. == 1) {
			print "$slugtext$/";
			print;
		} else {
			print;
		}
	}
}


