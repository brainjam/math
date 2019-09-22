
function zeta( x, tolerance=1e-10 ) {

  // Borwein algorithm

  var n = 14; // from error bound for tolerance

  if ( isComplex(x) && x.im !== 0 )
    n = Math.max( n, Math.ceil( log( 2 / abs(gamma(x)) / tolerance ) / log( 3 + sqrt(8) ) ) );

  var d = [ 1 ];
  for ( var i = 1 ; i <= n ; i++ )
    // order of multiplication reduces overflow, but factorial overflows at 171
    d.push( d[i-1] + n * factorial( n+i-1 ) / factorial( n-i ) / factorial( 2*i ) * 4**i );

  if ( isComplex(x) ) {

    // functional equation
    if ( x.re < 0 )
      return mul( pow(2,x), pow(pi,sub(x,1)), sin( mul(pi/2,x) ), gamma( sub(1,x) ), zeta( sub(1,x) ) );

    var s = complex(0);

    for ( var k = 0 ; k < n ; k++ )
      s = add( s, div( (-1)**k * ( d[k] - d[n] ), pow( k+1, x ) ) );

    return div( div( s, -d[n] ), sub( 1, pow( 2, sub(1,x) ) ) );

  } else {

    // functional equation
    if ( x < 0 ) return 2**x * pi**(x-1) * sin(pi*x/2) * gamma(1-x) * zeta(1-x);

    var s = 0;

    for ( var k = 0 ; k < n ; k++ )
      s += (-1)**k * ( d[k] - d[n] ) / (k+1)**x;

    return -s / d[n] / ( 1 - 2**(1-x) );

  }

}

function dirichletEta( x ) { return mul( zeta(x), sub( 1, pow( 2, sub(1,x) ) ) ); }


function bernoulli( n ) {

  if ( !Number.isInteger(n) ) throw Error( 'Noninteger argument for Bernoulli number' );

  if ( n < 0 ) throw Error( 'Unsupported argument for Bernoulli number' );

  if ( n === 0 ) return 1;

  if ( n === 1 ) return -.5;

  if ( n & 1 ) return 0;

  return (-1)**(n+1) * n * zeta(-n+1);

}

