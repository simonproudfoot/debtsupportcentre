<head>
    <?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Storage;
    ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <meta name="robots" content="noindex,nofollow">
    <title>Applications ‹ Statamic</title>
    <link href="../vendor/statamic/cp/css/cp.css?v=3.0.36" rel="stylesheet">
</head>

<body>
    <?php



    $todayExists = Storage::exists('applications/' . date('Y-m-d') . '.json');
    $day = '';
    if (isset($_GET['d'])) {
        $day = $_GET['d'];
    } else {
        if ($todayExists) {
            $day = date('Y-m-d');
        } else {
            $yesterday = strtotime("-1 day", strtotime(date('Y-m-d')));
            $day = date("Y-m-d", $yesterday);
        }
    }
    if(Storage::exists('applications/' . $day . '.json')){
        $file = Storage::get('applications/' . $day . '.json');
        $file = json_decode($file, true);
    }
    // previous day
    $oldDateA = strtotime("-1 day", strtotime($day));
    $previous_date = date("Y-m-d", $oldDateA);
    // next day
    $oldDateB = strtotime("1 day", strtotime($day));
    $next_date = date("Y-m-d", $oldDateB);
    ?>
    <div class="global-header">
        <div class="lg:w-56 pl-1 md:pl-3 h-full flex items-center">
            <a href="" class="href">
                < Control panel</a>
        </div>
        <div class="sm:px-4 w-full flex-1 mx-auto max-w-xl">

        </div>
        <div class="lg:absolute top-0 right-0 head-link h-full md:pr-3 flex items-center">

        </div>
    </div>
    <div id="statamic" class="pt-6">
     
        <div class="container mx-auto pt-6 px-4">
            <div class="flex items-center justify-between mb-3">
                <h1>Submissions <small><?php echo $day; ?></small></h1>
                <a class="btn-primary" href="http://dsc.test/cp/export?d=<?php echo $day; ?>">Export</a>
            </div>
            <div class="card mb-3 p-0">
                <?php if (isset($file)) {  ?>
                    <table class="table-auto text-left ">
                        <thead class="border-b-2">
                            <tr class="text-sm">
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>DebtValue</th>
                                <th>Creditors</th>
                                <th>Employment</th>
                                <th>ResidentialStatus</th>
                                <th>Tracking</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($file as $app) { ?>
                                <tr class="text-sm">
                                    <td><?php echo urldecode($app['Name']) ?></td>
                                    <td><?php echo urldecode($app['Mob']) ?></td>
                                    <td><?php echo urldecode($app['Email']) ?></td>
                                    <td><?php echo urldecode($app['DebtValue']) ?></td>
                                    <td><?php echo urldecode($app['Creditors']) ?></td>
                                    <td><?php echo urldecode($app['Employment']) ?></td>
                                    <td><?php echo urldecode($app['ResidentialStatus']) ?></td>
                                    <td class="w-1/4"><small title="<?php urldecode($app['a_url']) ?>"><?php echo substr(urldecode($app['a_url']), 0, 100) ?>....</small></td>
                                </tr>
                        <?php } ?>
                        </tbody>
                    </table>
                <?php } else {  ?>
                <h2 class="px-4 py-5">No records for <?php echo $day; ?></h2>
                <?php } ?>
            </div>
            <?php if (Storage::exists('applications/' . $previous_date . '.json')) { ?>
                <a class="btn-primary" href="http://<?php echo $_SERVER['HTTP_HOST'] . explode('?', $_SERVER['REQUEST_URI'], 2)[0] . '?d=' . $previous_date; ?>">
                    < Previous day</a>
                    <?php } ?>
                    <?php if (Storage::exists('applications/' . $next_date . '.json')) { ?>
                        <a class="btn-primary float-right" href="http://<?php echo $_SERVER['HTTP_HOST'] . explode('?', $_SERVER['REQUEST_URI'], 2)[0] . '?d=' . $next_date; ?>">Next day ></a>
                    <?php } ?>
        </div>
    </div>
</body>
<style>
    td,
    th {
        padding: 0.5em;
    }

    td {
        word-break: break-word;
    }
</style>