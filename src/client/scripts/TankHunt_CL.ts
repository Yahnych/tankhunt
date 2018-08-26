/// <reference path="refs.ts" />

class TH {

    /**
     * Instance of main Phaser game class
     */
    static game: Phaser.Game;
    /**
     * Instance of currently running game
     */
    static thGame: THGame_CL;
    /**
     * Instance of Effect Manager
     */
    static effects: EffectManager;

    static timeManager: TimeManager_CL;

    public socketManager: SocketManager_CL;

    // States
    public bootManager: BootManager_CL;
    public menuManager: MenuManager_CL;
    public loadManager: LoadManager_CL;
    public playManager: PlayManager_CL;

    public tManager: TimeManager_CL;

    static sizeCoeff: number;
    
    constructor() {
        
        this.socketManager = new SocketManager_CL(this);
        this.bootManager = new BootManager_CL();
        this.menuManager = new MenuManager_CL(this);
        this.loadManager = new LoadManager_CL(this);
        this.playManager = new PlayManager_CL(this);

        this.tManager = new TimeManager_CL(this.socketManager);
        TH.timeManager = this.tManager;
    }

    init() {
        this.initPhaser(); // Create and initialize Phaser instance
        this.socketManager.connect(); // Create websocket connection
    }
    
    initPhaser() {
        
        var phaserConfig = {
            width: 1920,
            height: 1080,
            /* forceSetTimeOut: true, */
            renderer: Phaser.CANVAS
        }

        TH.game = new Phaser.Game(phaserConfig);
        // Game states
        TH.game.state.add("boot", this.bootManager);
        TH.game.state.add("menu", this.menuManager);
        TH.game.state.add("load", this.loadManager);
        TH.game.state.add("play", this.playManager);

        TH.sizeCoeff = 70;
        TH.effects = new EffectManager(TH.game);
        TH.game.state.start("boot");

    }
}