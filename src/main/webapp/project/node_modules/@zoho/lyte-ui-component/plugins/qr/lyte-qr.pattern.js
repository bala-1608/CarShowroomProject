;( function(){

    function addPattern( ctx, pattern, x, y, unit_x, unit_y, pts, row_index, col_index ){
        switch( pattern ){
            case "square" : {
                var size = .9,
                size_loss_x = unit_x * ( 1 - size ),
                size_loss_y = unit_y * ( 1 - size );

                ctx.rect( x + size_loss_x, y + size_loss_y, unit_x - 2 * size_loss_x, unit_y - 2 * size_loss_y );
            }
            break;
            case "circle" : {
                var size = .9;

                ctx.arc( x + unit_x / 2, y + unit_y / 2, unit_x * size / 2, 0, 2 * Math.PI );
            }
            break;
            case "diamond" : {
                ctx.save();
                ctx.translate( x + 0.5 * unit_x, y );
                ctx.rotate( Math.PI / 4 );
                ctx.rect( 0, 0, unit_x / 1.414, unit_y / 1.414 );
                ctx.restore();
            }
            break;
            case "star" : {
                var size = 1,
                size_loss = ( 1 - size ) / 2,
                mid_x = x + unit_x / 2,
                mid_y = y + unit_y / 2,
                size_loss_value = size_loss * unit_y,
                radius = unit_x * ( 0.5 - size_loss );

                ctx.moveTo( mid_x, y + size_loss_value );
                ctx.arcTo( mid_x, mid_y, x + size_loss_value, mid_y, radius );
                ctx.arcTo( mid_x, mid_y, mid_x, y + unit_y - size_loss_value, radius );
                ctx.arcTo( mid_x, mid_y, x + unit_x - size_loss_value, mid_y, radius );
                ctx.arcTo( mid_x, mid_y, mid_x, y + size_loss_value, radius );
            }   
            break;
            case "horizontal_line" : {
                var nxt = pts[ row_index ][ col_index + 1 ] || {};
                if( !nxt.fill || nxt.type == "finder_pattern" ){
                    var previous_fills = -1,
                    size = .8,
                    prev = pts[ row_index ][ col_index ];

                    while( prev && prev.fill && prev.type != "finder_pattern" ){
                        prev = pts[ row_index ][ col_index - ++previous_fills - 1 ];
                    }

                    switch( previous_fills ){
                        case 0 : {
                            addPattern( ctx, "circle", x, y, unit_x, unit_y );
                        }
                        break;
                        default : {
                            var ref_x = x - unit_x * previous_fills,
                            half_unit = unit_x / 2;
                            ctx.moveTo( ref_x + half_unit, y );
                            ctx.arcTo( ref_x, y, ref_x, y + half_unit, half_unit );
                            ctx.arcTo( ref_x, y + unit_y, ref_x + half_unit, y + unit_y, half_unit );
                            ctx.lineTo( ref_x + previous_fills * unit_x + half_unit, y + unit_y );
                            ctx.arcTo( x + unit_x, y + unit_y, x + unit_x, y + half_unit, half_unit );
                            ctx.arcTo( x + unit_x, y, x - half_unit, y, half_unit );
                            ctx.lineTo( ref_x + half_unit, y );
                        }
                    }
                }
            }   
            break;
            case "vertical_line" : {
                var nxt = ( pts[ row_index + 1 ] || {} )[ col_index ] || {};
                if( !nxt.fill || nxt.type == "finder_pattern" ){
                    var previous_fills = -1,
                    size = .8,
                    prev = pts[ row_index ][ col_index ];

                    while( prev && prev.fill && prev.type != "finder_pattern" ){
                        prev = ( pts[ row_index - ++previous_fills - 1 ] || {} )[ col_index ];
                    }

                    previous_fills = Math.max( 0, previous_fills );

                    switch( previous_fills ){
                        case 0 : {
                            addPattern( ctx, "circle", x, y, unit_x, unit_y );
                        }
                        break;
                        default : { 
                            var ref_y = y - unit_y * previous_fills,
                            half_unit = unit_x / 2;
                            ctx.moveTo( x, ref_y + half_unit );
                            ctx.arcTo( x, ref_y, x + half_unit, ref_y, half_unit );
                            ctx.arcTo( x + unit_x, ref_y, x + unit_x, ref_y + half_unit, half_unit );
                            ctx.lineTo(  x + unit_x, ref_y + previous_fills * unit_y + half_unit );
                            ctx.arcTo( x + unit_x, y + unit_y, x + half_unit, y + unit_y, half_unit );
                            ctx.arcTo( x , y + unit_x, x, y - half_unit, half_unit );
                            ctx.lineTo( x, ref_y + half_unit );
                        }
                    }
                }
            }   
            break;
        }
    }

    if( typeof $L == "undefined" ){
        window.LyteQRPattern = addPattern;
    } else {
        $L.addPattern = addPattern;
    }
} )();