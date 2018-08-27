interface PacketGameObject {
    /**
     * Text id that gameobject acquired from the server
     */
    id: string,
    /**
     * X coordinate of the gameobject's position
     */
    x: number,
    /**
     * Y coordinate of the gameobject's position
     */
    y: number,
    /**
     * Rotation in RADIANS
     */
    rot: number

}

interface PacketTank extends PacketGameObject {
    /**
     * Turret rotation in RADIANS
     */
    turrRot: number,
    /**
     * String ID of the player that owns this tank, this id is generated
     * by socket.io
     */
    plID: string
}

interface PacketPlayerInfo {
    /**
     * Id of the player generated by socket.io
     */
    id: string,
    /**
     * Name of the player
     */
    name: string,
    /**
     * Object that contains information about current player's statistics
     */
    stats?: PlayerStats,
    /**
     * Determine if player is currently alive on the server
     */
    alive: boolean
    /**
     * Information about player's tank
     */
    tank?: PacketTank,

    health: number,
    maxHealth: number
}

interface PacketShotStart extends PacketGameObject {
    /**
     * Type of the shot
     */
    type: string,
    /**
     * X coordinate of the start position
     */
    startX: number,
    /**
     * Y coordinate of the start position
     */
    startY: number,
    /**
     * The time indicating when the shot was created on the server
     */
    startTime: number,
    /**
     * socket.io ID of the player that shoot this shot
     */
    ownerID: string
    /**
     * X coordinate of the shot's endpoint
     */
    endX?: number,
    /**
     * Y coordinate of the shot's endpoint
     */
    endY?: number,
    /**
     * Speed of the shot
     */
    speed?: number,
    /**
     * Bounce points of the shot
     */
    pts?: {x:number, y: number, ang: number}[]
    /**
     * This property is filled on the client when passing packet to new shot
     */
    ownerObj?: Player_CL 
}

interface PacketHeal {
    plID: string, 

    healthBef: number,
    healthAft: number,

    maxHealthBef: number,
    maxHealthAft: number
}

interface WayPoint {
	x: number,
	y: number,
	ang: number
}

interface PacketGameFinish {
    subgame?: boolean,
    winnerID?: string,

    nextLevel?: PacketLevel,
    nextDelay?: number
}

interface PacketEliminatorStart extends PacketBouncerShotStart {
    spl: { ang: number, speed: number }[];
    splTime: number;
}

interface PacketBouncerShotStart extends PacketShotStart {
    pts: WayPoint[]
}

interface PacketRespawn extends PacketTank {
    /**
     * Time when the respawn countdown starts
     */
    serverTime: number,
    /**
     * Time to the actual respawn
     */
    respawnDelay: number,
    /**
     * How long immunity is after tank is actually respawned
     */
    immunityTime: number,
    /**
     * Health of player's tank
     */
    health: number,
}

interface PacketItem extends PacketGameObject {
    /**
     * Type of the shot, proper object is generated according to this index
     */
    typeIndex: number
}

interface PacketGameInfo {
    players: PacketPlayerInfo[],
    items: PacketItem[]
}
interface PacketItemCollect {
    /**
     * Id of collected item
     */
    id: string;
    /**
     * Id of player that collected this item
     */
    playerID: string;
}

interface PacketGameStart extends PacketGameInfo {
    gameType: string,
    level: PacketLevel,
    countDown?: number,
    winCount?: number
}

/**
 * Levels can be passed by json (randomly generated), or by a name (pregenerated and shared)
 */
interface PacketLevel {
    json?: string,
    name?: string
} 

interface PacketGameRequest {
    gameType: string,
    playerName: string
}

interface PacketMovable {
    players: { [key: string]: PacketTank }
}

interface PacketKill {
    /**
     * Id of a player that was killing (not id of his tank!)
     */
    killerID: string,
    /**
     * Id of a player that was killed (not id of his tank!)
     */
    killedID: string,
    /**
     * Id of a shot that was killing
     */
    shotID: string
}

interface PacketShotHit {
    /**
     * ID of a player that was hit
     */
    plID: string,
    /**
     * ID of a player who owns the shot
     */
    plAttID: string,
    /**
     * ID of a shot that hits
     */
    shotID: string,
    /**
     * Player health before the hit
     */
    healthBef?: number,
    /**
     * Player health after the hit
     */
    healthAft?: number,
    /**
     * If blast is set to true, blast method on shot should be called
     */
    blast?: boolean,
    /**
     * Should the shot be removed after this hit?
     */
    rm?: boolean,
    /**
     * X coordinate of the hit position
     */
    x?: number,
    /**
     * Y coordinate of the hit position
     */
    y?: number
    /**
     * X coordinate of tank's position at hit moment
     */
    xTank?: number,
    /**
     * Y coordinate of tank's position at hit moment
     */
    yTank?: number
}

interface PacketAppear {
    /**
     * ID of player that appears
     */
    plID: string,
    /**
     * X coordinate of appear position
     */
    atX: number,
    /**
     * Y coordinate of appear position
     */
    atY: number
}

interface PacketDisappear {
    plID: string
}

interface PlayerStats {
    kills: number,
    deaths: number,
    wins: number,
    suic: number,
    teamK: number,
    blockC: number,

    inRow: number,
    maxRow: number,

    dmgR: number,
    dmgD: number
    [key: string]: any
}


interface PacketMenuInfo {
    arenaG: number,

    duelG: number,

    menuP: number,
    totalP: number
}

interface PacketChatMessage {
    mess: string;
    name: string;
}