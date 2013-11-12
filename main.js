;(function(){
	var 
		flag_vacio=0,
		movimientos=0,
		a_fichas = [false,1,2,3,4,5,6,7,8],
		a_celdas = document.getElementsByClassName("celda");
	
	var matriz =  new Array();
	var base_matriz = Math.sqrt(a_fichas.length);
	//Funcion rebover
	a_fichas = a_fichas.sort(function() {return Math.random() - 0.5});
	
	var movimiento = function(){
		/*
						 [y-1,x]
			[y,x-1]	[y,x]	[y,x+1]					
						 [y+1,x]
		*/
		var posicion = this.getAttribute("id");
		y = Math.floor(posicion/base_matriz);
		x = posicion%base_matriz;
		//[0,2]
		//console.log(y + ", " + x + " ::" + matriz[y][x] + " Posicion =" + posicion );		
		if(y>0 && matriz[y-1][x] == false){
			//console.log("Vacio Arriba");
			this.parentNode.removeChild(this);
			this.setAttribute('id', flag_vacio);
			a_celdas[ flag_vacio ].appendChild(this);
			flag_vacio = posicion;
		}		
		else if(x>0 && matriz[y][x-1] == false){
			//console.log("Vacio Izquierda");
			this.parentNode.removeChild(this);
			this.setAttribute('id', flag_vacio);
			a_celdas[ flag_vacio ].appendChild(this);
			flag_vacio = posicion;
		}		
		else if(x<base_matriz-1 && matriz[y][x+1] == false){
			//console.log("Vacio derecha");
			this.parentNode.removeChild(this);
			this.setAttribute('id', flag_vacio);
			a_celdas[ flag_vacio ].appendChild(this);
			flag_vacio = posicion;
		}else if(y<base_matriz-1 && matriz[y+1][x] == false){
			//console.log("Vacio abajo");
			this.parentNode.removeChild(this);
			this.setAttribute('id', flag_vacio);
			a_celdas[ flag_vacio ].appendChild(this);
			flag_vacio = posicion;
		}else{
			console.log("fail;")
		}

		if(win()){
			console.log(flag_vacio);
			alert("¡Felicidades ganaste!");
			9location.reload();
		}else{
			console.log("lleva " + ++movimientos + ".")
		}

		
		recarga_matriz();

	};

	var win = function(){
		var fichas = document.getElementsByClassName("ficha");
		//console.log(fichas);
		for(var i=0; i< (base_matriz*3)-1 ; i++)
		{
			//console.log(fichas[i].innerHTML);
			if(fichas[i].innerHTML != i+1)
			{
				return false;
			}
		}
		if (flag_vacio==8)
		{
			return true;
		};
	}

	a_fichas.forEach( function(val, index, theArray) {
		if(val){
			var ficha = document.createElement('span');
			ficha.innerHTML = val;
			ficha.setAttribute('id', index);
			ficha.classList.add('ficha');
			a_celdas[index].appendChild(ficha);
			ficha.addEventListener('click',movimiento,false);
		}else{
			flag_vacio=index;
			//console.log(flag_vacio);
		}
	});

	
	var recarga_matriz = function(){
		var fichas = document.getElementsByClassName("ficha");
		fichas = Array.prototype.slice.apply( fichas );
		//console.log(fichas);
		fichas.splice(flag_vacio,0,false);
		var i=0;
		for (var y = 0; y < base_matriz; y++) {
			matriz[y]=new Array(base_matriz);
			for (var x = 0; x < base_matriz; x++) {
				if(i==flag_vacio)
					matriz[y][x]=false;
				else
					matriz[y][x]= fichas[i].innerHTML;
				i++;
			}
		}
		//console.log(matriz);
		//console.log("recarga :)");
	}
	recarga_matriz();
	//console.log(matriz);


})();