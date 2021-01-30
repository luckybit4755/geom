#!/usr/bin/env node 
//https://people.sc.fsu.edu/~jburkardt/data/ply/ply.html

const fs = require( 'fs' );

const geom_to_ply = function() {
	const self = this;

	self.main = ( args ) => {
		fs.readFile( args[ 0 ], 'utf-8', (e,d)=>{
			if ( e ) throw e;
			self.convert( d.trim().split( '\n' ) );
		});
	};

	self.convert = ( lines ) => {
		//26 32 56
		//v  f  e 
		let nfo = lines[ 0 ].split( ' ' ).map(v=>parseInt(v));
		let v = nfo[ 0 ];
		let f = nfo[ 1 ];
		console.log( 'ply' );
		console.log( 'format ascii 1.0' );
		console.log( 'comment made by me' );
		console.log( 'comment this file is a fun' );
		console.log( 'element vertex ' + v );
		console.log( 'property float32 x' );
		console.log( 'property float32 y' );
		console.log( 'property float32 z' );
		console.log( 'element face ' + f );
		console.log( 'property list uint8 int32 vertex_index' );
		console.log( 'end_header' );

		lines = lines.splice( 1 );
		let vz = lines.splice( 0, v );
		let fz = lines.map( v => v.split( ' ' ).map((v,i)=>parseInt(v)-(i?1:0)).join( ' ' ) );

		console.log( vz.join( '\n' ) );
		console.log( fz.join( '\n' ) );
		
	};
};

new geom_to_ply().main( process.argv.slice( 2 ) );
