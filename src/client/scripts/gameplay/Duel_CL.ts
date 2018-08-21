class Duel_CL extends THGame_CL {

    constructor(sm: SocketManager_CL, packet: PacketGameStart) {
        super(sm);

        console.log("Creating duel game...");

        // Create players
        for (let i = 0; i < packet.players.length; i++) {
            let plr = packet.players[i];

            this.newPlayerFromPacket(packet.players[i]);
        }

        this.processLevel(packet.level);

        this.running = true;

        

    }

    processGameFinish(data: PacketGameFinish) {
        // Duel subgame finished
        if (data.subgame) {
            this.tidy();
            this.processLevel(data.nextLevel);
            new UICountdown_CL(TH.game).startNew(data.nextDelay, TH.game.world.centerX, 200, 100);
   
        } else {
            console.log("Duel ends!");
        }

    }

    subgameEnd(nextLevel: Level_CL, timeout: number) {

    }
}