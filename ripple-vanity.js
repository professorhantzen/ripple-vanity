// ripple vanity address finder
//
const l 	    = console.log;
const s 	    = process.stdout;
const cr 	    = '\r\x1b[K';
const vanity_string = process.argv[2];
const attempts 	    = process.argv[3];

var kp 		= require('ripple-keypairs');
var start_time 	= Date.now();
var end_time 	= null;
var valid 	= false;
var found 	= 0;
var usage 	= 'Ripple Vanity Address Finder v1.0\n\n'+
		  'usage:    node vanity-ripple.js <search-string> <number-of-attempts>\n'+
		  'example:  node vanity-ripple.js xrp 100000\n\n'+
		  '<search-string> may be comprised of any of these characters:\n'+
		  '123456789 ABCDEFGH JKLMN PQRSTUVWXYZabcdefghijk mnopqrstuvwxyz\n'+
		  '(Note: \'0\', \'I\', \'O\' and \'l\' are excluded.)';

if(vanity_string &&
   vanity_string.split('0').length === 1 && 
   vanity_string.split('I').length === 1 &&
   vanity_string.split('O').length === 1 &&
   vanity_string.split('l').length === 1 ) valid = true;

if(attempts > 0 && valid) {
	l('Searching', attempts, 'addresses for ' + '\"' + vanity_string +'\"...');
	s.write(cr + '0%');
	var temp_wallet = null;
	var prog 	= (attempts/100).toFixed(0) * 1; // for speed not accuracy
	var step 	= prog;
	var perc 	= 0;
	for(var i = 0; i<attempts; i++){
		if(i == prog) {
			s.write(cr + ++perc + '%');
			prog += step;
		}
		temp_wallet = kp.generateWallet();
		if(temp_wallet.accountID.indexOf(vanity_string)>-1) { 
			l(cr + i +', ' + temp_wallet.accountID + ', ' + temp_wallet.seed); 
			found++; 
		}
	}
	end_time = Date.now();
	var pl = ''; if(found>1 || found === 0) pl = 'es' ;
	l(cr + found + ' address'+pl+' found. Took ' + ((end_time-start_time)/60000).toFixed(1) + ' minutes.');
} else {
	l(usage);
}
